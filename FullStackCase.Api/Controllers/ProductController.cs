using FullStackCase.Api.Application.Features.Products.Commands;
using FullStackCase.Api.Application.Features.Products.Commands.Handlers;
using FullStackCase.Api.Application.Features.Products.Queries;
using FullStackCase.Api.Application.Features.Products.Queries.Handlers;
using FullStackCase.Api.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StackExchange.Redis;
using System.Text.Json;

namespace FullStackCase.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly CreateProductHandler _createHandler;
        private readonly GetAllProductsHandler _getAllHandler;
        private readonly UpdateProductHandler _updateHandler;
        private readonly DeleteProductHandler _deleteHandler;
        private readonly IConnectionMultiplexer _redis;
        private readonly IDatabase _cache;
        private readonly JsonSerializerOptions _jsonOptions;

        public ProductController(
            CreateProductHandler createHandler,
            GetAllProductsHandler getAllHandler,
            UpdateProductHandler updateHandler,
            DeleteProductHandler deleteHandler,
            IConnectionMultiplexer redis)
        {
            _createHandler = createHandler;
            _getAllHandler = getAllHandler;
            _updateHandler = updateHandler;
            _deleteHandler = deleteHandler;
            _redis = redis;
            _cache = _redis.GetDatabase();

            _jsonOptions = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                WriteIndented = false
            };
        }

        // GET: api/product
        [HttpGet]
        public IActionResult GetAll()
        {
            string cacheKey = "products";

            // Cache kontrolü
            var cachedProducts = _cache.StringGet(cacheKey);
            if (!cachedProducts.IsNullOrEmpty)
            {
                var productsFromCache = JsonSerializer.Deserialize<List<Product>>(cachedProducts, _jsonOptions);
                return Ok(new
                {
                    source = "cache",
                    data = productsFromCache
                });
            }

            // Cache yoksa CQRS Query üzerinden çek
            var products = _getAllHandler.Handle();

            // Cache'e yaz
            _cache.StringSet(cacheKey, JsonSerializer.Serialize(products, _jsonOptions), TimeSpan.FromMinutes(5));

            return Ok(new
            {
                source = "database",
                data = products
            });
        }
        // GET: api/product/{id}
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            // Önce cache’ten kontrol
            var cacheKey = $"product:{id}";
            var cachedProduct = _cache.StringGet(cacheKey);

            if (!cachedProduct.IsNullOrEmpty)
            {
                var productFromCache = JsonSerializer.Deserialize<Product>(cachedProduct, _jsonOptions);
                return Ok(new
                {
                    source = "cache",
                    data = productFromCache
                });
            }

            // Cache yoksa database’den çek
            var products = _getAllHandler.Handle();
            var product = products.FirstOrDefault(p => p.Id == id);

            if (product == null)
                return NotFound();

            // Cache’e yaz
            _cache.StringSet(cacheKey, JsonSerializer.Serialize(product, _jsonOptions), TimeSpan.FromMinutes(5));

            return Ok(new
            {
                source = "database",
                data = product
            });
        }


        // POST: api/product (JWT ile korumalı)
        [HttpPost]
        [Authorize]
        public IActionResult Create(CreateProductCommand command)
        {
            var product = _createHandler.Handle(command);

            // Cache'i temizle
            _cache.KeyDelete("products");

            return Ok(product);
        }

        // PUT
        [HttpPut("{id}")]
        [Authorize]
        public IActionResult Update(int id, UpdateProductCommand command)
        {
            var product = _updateHandler.Handle(id, command);
            if (product == null) return NotFound();

            _cache.KeyDelete("products");
            return Ok(product);
        }

        // DELETE
        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult Delete(int id)
        {
            var success = _deleteHandler.Handle(id);
            if (!success) return NotFound();

            _cache.KeyDelete("products");
            return NoContent();
        }
    }
}

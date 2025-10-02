using FullStackCase.Api.Data;
using FullStackCase.Api.Domain;

namespace FullStackCase.Api.Application.Features.Products.Commands.Handlers
{
    public class CreateProductHandler
    {
        private readonly AppDbContext _context;
        public CreateProductHandler(AppDbContext context)
        {
            _context = context;
        }

        public Product Handle(CreateProductCommand command)
        {
            var product = new Product
            {
                Name = command.Name,
                Description = command.Description,
                Price = command.Price,
                Category = command.Category,
                CreatedAt = DateTime.UtcNow
            };

            _context.Products.Add(product);
            _context.SaveChanges();

            return product;
        }
    }
}

using FullStackCase.Api.Data;
using FullStackCase.Api.Domain;
using System.Collections.Generic;
using System.Linq;

namespace FullStackCase.Api.Application.Features.Products.Queries.Handlers
{
    public class GetAllProductsHandler
    {
        private readonly AppDbContext _context;
        public GetAllProductsHandler(AppDbContext context)
        {
            _context = context;
        }

        public List<Product> Handle()
        {
            return _context.Products.ToList();
        }
    }
}

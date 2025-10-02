using FullStackCase.Api.Data;
using FullStackCase.Api.Domain;

namespace FullStackCase.Api.Application.Features.Products.Commands.Handlers
{
    public class UpdateProductHandler
    {
        private readonly AppDbContext _context;

        public UpdateProductHandler(AppDbContext context)
        {
            _context = context;
        }

        public Product? Handle(int id, UpdateProductCommand command)
        {
            var product = _context.Products.Find(id);
            if (product == null) return null;

            product.Name = command.Name;
            product.Description = command.Description;
            product.Price = command.Price;
            product.Category = command.Category;

            _context.SaveChanges();
            return product;
        }
    }
}

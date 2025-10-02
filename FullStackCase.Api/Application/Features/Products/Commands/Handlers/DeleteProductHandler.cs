using FullStackCase.Api.Data;
using FullStackCase.Api.Domain;

namespace FullStackCase.Api.Application.Features.Products.Commands.Handlers
{
    public class DeleteProductHandler
    {
        private readonly AppDbContext _context;

        public DeleteProductHandler(AppDbContext context)
        {
            _context = context;
        }

        public bool Handle(int id)
        {
            var product = _context.Products.Find(id);
            if (product == null) return false;

            _context.Products.Remove(product);
            _context.SaveChanges();
            return true;
        }
    }
}

using FullStackCase.Api.Domain;

namespace FullStackCase.Api.Application.Features.Products.Commands
{
    public class CreateProductCommand
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string Category { get; set; }
    }
}

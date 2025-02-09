import { Router, Response, Request } from 'express';
import { ProductsService } from './service';
import { config } from '../../config';
import { Product, ProductId } from './schemas';
import { validateBody, validateQuery } from '../../utils/validators';
import { postProductSchema } from './validators';
import { emptyObjectSchema } from '../../utils/zod';
import { HttpStatus } from '../../utils/http.status';

class ProductsRouter {
  router: Router;

  constructor(private service: ProductsService) {
    this.router = Router();

    this.router.get(config.paths.products, validateQuery(emptyObjectSchema), this.getProducts);
    this.router.post(config.paths.products, validateBody(postProductSchema), this.createProduct);
    this.router.post(
      `${config.paths.products}/:id/restock`,
      validateBody(emptyObjectSchema),
      this.restockProduct,
    );
    this.router.post(
      `${config.paths.products}/:id/sell`,
      validateBody(emptyObjectSchema),
      this.sellProduct,
    );
  }

  getProducts = async (_: Request, res: Response): Promise<Response<Product[]>> => {
    const products: Product[] = await this.service.getProducts();
    return res.json(products);
  };

  createProduct = async (req: Request, res: Response): Promise<Response<Product>> => {
    const product: Product = await this.service.createProduct(req.body);
    return res.status(HttpStatus.CREATED).json(product);
  };

  restockProduct = async (req: Request, res: Response): Promise<Response<number>> => {
    const productCount: number = await this.service.restockProduct(req.params.id as ProductId);
    return res.status(HttpStatus.CREATED).json(productCount);
  };

  sellProduct = async (req: Request, res: Response): Promise<Response<number>> => {
    const productCount: number = await this.service.sellProduct(req.params.id as ProductId);
    return res.status(HttpStatus.CREATED).json(productCount);
  };
}

export const productsRouter = new ProductsRouter(new ProductsService()).router;

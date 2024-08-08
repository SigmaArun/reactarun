import ProductItem from './ProductItem';
import classes from './Products.module.css';


const productData=[
  {id:'1', price : 6, title: 'first Book',description:'the first book i ever wrote '},
  {id:'2', price : 5, title: 'second Book',description:'the second book i ever wrote '},
]
const Products = (props) => {
  // here i will add products data 
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {productData.map((product)=>(
                 <ProductItem
                 key={product.id}
                 id={product.id}
                 title={product.title}
                 price={product.price}
                 description={product.description}
               />
        ))}
       
      </ul>
    </section>
  );
};

export default Products;

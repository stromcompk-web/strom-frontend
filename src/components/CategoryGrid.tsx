import { Link } from "react-router-dom";
import catMenTops from "@/assets/cat-men-tops.jpg";
import catMenOuterwear from "@/assets/cat-men-outerwear.jpg";
import catMenShirts from "@/assets/cat-men-shirts.jpg";
import catMenTrousers from "@/assets/cat-men-trousers.jpg";
import catWomenOuterwear from "@/assets/cat-women-outerwear.jpg";
import catWomenBlazers from "@/assets/cat-women-blazers.jpg";
import catWomenDresses from "@/assets/cat-women-dresses.jpg";
import catWomenSweaters from "@/assets/cat-women-sweaters.jpg";
import catKids from "@/assets/cat-kids.jpg";

type Category = {
  name: string;
  image: string;
  href: string;
};

const menCategories: Category[] = [
  { name: "Tops", image: catMenTops, href: "/shop/men" },
  { name: "Outerwear", image: catMenOuterwear, href: "/shop/men" },
  { name: "Casual Shirts", image: catMenShirts, href: "/shop/men" },
  { name: "Trousers", image: catMenTrousers, href: "/shop/men" },
];

const womenCategories: Category[] = [
  { name: "Outerwear", image: catWomenOuterwear, href: "/shop/women" },
  { name: "Blazers", image: catWomenBlazers, href: "/shop/women" },
  { name: "Dresses", image: catWomenDresses, href: "/shop/women" },
  { name: "Sweaters", image: catWomenSweaters, href: "/shop/women" },
];

const kidsCategories: Category[] = [
  { name: "Kids Collection", image: catKids, href: "/shop/kids" },
  { name: "Outerwear", image: catWomenOuterwear, href: "/shop/kids" },
  { name: "Blazers", image: catWomenBlazers, href: "/shop/kids" },
  { name: "Dresses", image: catWomenDresses, href: "/shop/kids" },
  { name: "Sweaters", image: catWomenSweaters, href: "/shop/kids" },
];

const CategoryCard = ({ category }: { category: Category }) => (
  <Link
    to={category.href}
    className="group relative overflow-hidden block bg-secondary"
  >
    <div className="aspect-[3/4] overflow-hidden">
      <img
        src={category.image}
        alt={category.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
    </div>
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/70 to-transparent p-4">
      <h3 className="font-display text-lg uppercase tracking-wider text-primary-foreground">
        {category.name}
      </h3>
    </div>
  </Link>
);

const CategorySection = ({
  title,
  categories,
}: {
  title: string;
  categories: Category[];
}) => (
  <section className="py-12 md:py-16">
    <div className="container">
      <h2 className="font-display text-3xl md:text-4xl uppercase tracking-wider text-foreground mb-8 text-center">
        {title}
      </h2>
      <div className={`grid gap-4 ${
        categories.length === 1
          ? "grid-cols-1 max-w-sm mx-auto"
          : categories.length === 2
          ? "grid-cols-2"
          : "grid-cols-2 md:grid-cols-4"
      }`}>
        {categories.map((cat) => (
          <CategoryCard key={cat.name + cat.image} category={cat} />
        ))}
      </div>
    </div>
  </section>
);

const CategoryGrid = () => (
  <>
    <CategorySection title="Shop Men" categories={menCategories} />
    <div className="border-t border-border" />
    <CategorySection title="Shop Women" categories={womenCategories} />
    <div className="border-t border-border" />
    <CategorySection title="Shop Kids" categories={kidsCategories} />
  </>
);

export default CategoryGrid;

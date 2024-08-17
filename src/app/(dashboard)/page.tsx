import BestSellerProducts from "@/components/BestSellerProducts";
import LatestProducts from "@/components/LatestProducts";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-6 p-8 w-full max-w-7xl">
      <div className="flex flex-col items-center gap-2">
        <h1 className="font-bold text-3xl">Welcome to Shopping</h1>
        <p className="text-lg">The best place to shop online</p>
      </div>
      <LatestProducts />
      <BestSellerProducts />
    </div>
  );
}

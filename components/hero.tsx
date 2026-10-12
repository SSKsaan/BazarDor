import Image from "next/image";
import HeroDate from "./hero-date";
import heroImage from "../public/hero.png";

export default function Hero() {
  return (
    <section className="flex flex-col items-center gap-2 rounded-2xl border border-black/20 bg-white p-6 pt-14 shadow-sm lg:flex-row lg:gap-6 lg:p-8">
      <div className="flex-1 px-8 lg:pr-0">
        <HeroDate />
        <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
          <span className="block">আজকের বাজারের দাম</span>
          <span className="block">এক নজরে</span>
        </h1>
        <p className="mt-3 text-lg text-base-content/60">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
          বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>
        <a href="#সব-পণ্য" className="btn btn-lg btn-primary mt-6 font-bold">
          সব পণ্য দেখুন
        </a>
      </div>
      <div className="flex w-full flex-1 items-center justify-center">
        <Image
          src={heroImage}
          alt="সবজির ঝুড়ি"
          priority
          quality={100}
          className="h-auto w-full max-w-md"
        />
      </div>
    </section>
  );
}

function HeroImage() {
  return (
    <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px]">
      <img
        src={"/Images/reading.png"}
        alt="heroImage"
        className="object-contain dark:hidden h-full w-full"
      />
      <img
        src={"/Images/reading-dark.png"}
        alt="heroImage"
        className="object-contain hidden dark:block h-full w-full"
      />
    </div>
  );
}

export default HeroImage;

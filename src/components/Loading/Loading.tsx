function Loading() {
  return (
    <div className="h-full w-full bg-background relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <img
          src={"/Images/logo.svg"}
          height={200}
          width={200}
          alt="Loading"
          className="dark:hidden"
        />
        <img
          src={"/Images/logo-dark.svg"}
          height={200}
          width={200}
          alt="Loading"
          className="hidden dark:block"
        />
        <h2 className="text:lg md:text-2xl">Loading...</h2>
      </div>
    </div>
  );
}

export default Loading;

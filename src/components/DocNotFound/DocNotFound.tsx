function DocNotFound({ pageMode }: any) {
  return (
    <div className="h-full w-full bg-background relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <img
          src={"/Images/error.png"}
          height={500}
          width={500}
          alt="error"
          className=" dark:hidden"
        />
        <img
          src={"/Images/error-dark.png"}
          height={500}
          width={500}
          alt="error"
          className="hidden dark:block"
        />
        <h2 className="text:xl md:text-3xl">
          {pageMode ? "DOC NOT FOUND" : "CHILL MODE"}
        </h2>
      </div>
    </div>
  );
}

export default DocNotFound;

function Logo() {
  return (
    <>
      <img
        className="dark:hidden"
        src={"Images/logo.svg"}
        alt="Logo"
        width={60}
        height={60}
      />
      <img
        className="hidden dark:block"
        src={"Images/logo-dark.svg"}
        alt="Logo"
        width={60}
        height={60}
      />
    </>
  );
}

export default Logo;

export default function Container({ 
  children, 
  className = "", 
  size = "default", 
  paddingY = "py-20" 
}) {

  const sizes = {
    default: "max-w-7xl",
    wide: "max-w-[1400px]",
    narrow: "max-w-5xl",
    full: "max-w-full"
  };

  return (
    <div
      className={`
        ${sizes[size]}
        mx-auto
        px-6 lg:px-8
        ${paddingY}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
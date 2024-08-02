"use client";

export const MdxH2: React.FC<React.PropsWithChildren<{ id?: string }>> = ({
  id,
  children,
}) => {
  return (
    <>
      <a className="block invisible relative -top-28" id={id} />
      <h2
        onClick={() => (window.location.hash = `#${id}`)}
        className="group cursor-pointer text-2xl pb-3 pt-6 font-semibold"
      >
        <span className="absolute -left-6 hidden font-normal text-zinc-400 lg:group-hover:inline">
          #
        </span>
        {children}
      </h2>
    </>
  );
};

export const MdxH3: React.FC<React.PropsWithChildren<{ id?: string }>> = ({
  id,
  children,
}) => {
  return (
    <>
      <a className="block invisible relative -top-28" id={id} />
      <h3
        onClick={() => (window.location.hash = `#${id}`)}
        className="group cursor-pointer text-xl font-semibold pt-4 pb-2"
      >
        <span className="absolute -left-6 hidden font-normal text-zinc-400 lg:group-hover:inline">
          #
        </span>
        {children}
      </h3>
    </>
  );
};

export const MdxH4: React.FC<React.PropsWithChildren<{ id?: string }>> = ({
  id,
  children,
}) => {
  return (
    <>
      <a className="block invisible relative -top-28" id={id} />
      <h4
        onClick={() => (window.location.hash = `#${id}`)}
        className="group cursor-pointer"
      >
        <span className="absolute -left-6 hidden font-normal text-zinc-400 lg:group-hover:inline">
          #
        </span>
        {children}
      </h4>
    </>
  );
};

export const MdxA: React.FC<React.PropsWithChildren & { href?: string }> = ({
  children,
  href,
}) => {
  return (
    <a
      rel="nofollow"
      className="text-brand cursor-pointer visited:text-brand/60 hover:text-brand/80 hover:underline"
      href={href}
      target="_blank"
    >
      {children}
    </a>
  );
};

export const MdxP: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <p className="pb-4">{children}</p>;
};

export const MdxUl: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ul className="list-disc list-outside pl-6 pr-24 [&>li]:mb-3">
      {children}
    </ul>
  );
};

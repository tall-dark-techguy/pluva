import Link from "next/link";

export const NavItem = ({ href, children, className, ...rest }) => {
  return (
    <li className="nav-item">
      <Link href={href}>
        <a className={`nav-link ${className}`} {...rest}>
          {children}
        </a>
      </Link>
    </li>
  );
};

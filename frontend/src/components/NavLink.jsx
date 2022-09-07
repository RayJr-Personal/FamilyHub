import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import Link from 'next/link'

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  exact: PropTypes.bool
};

NavLink.defaultProps = {
  exact: false
};

export function NavLink({ href, children, exact, ...props }) {
  const { pathname } = useRouter();
  const isActive = exact ? pathname === href : pathname.startsWith(href);
  
  if (isActive) {
      props.className += ' active';
  }

  return (
    <Link
      href={href}
      className="inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
      {...props}
    >
      {children}
    </Link>
  )
}

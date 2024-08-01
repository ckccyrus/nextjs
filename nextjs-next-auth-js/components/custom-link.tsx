import Link from "next/link";

interface CustomLinkProps extends React.LinkHTMLAttributes<HTMLAnchorElement> {
    href: string    //must have href
}

const CustomLink = ({
    href, children, className, ...restProps
}: CustomLinkProps) => {
    const _isInternalLink = href.startsWith("/");
    const _isAnchorLink = href.startsWith("#");

    if (_isInternalLink || _isAnchorLink) {
        return (
            <Link href={href} className={className} {...restProps}>
                {children}
            </Link>
        )
    }
}

export default CustomLink;
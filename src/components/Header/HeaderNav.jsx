import { Link } from "react-router-dom";

export const HeaderNav = ({ title, links, link_actual }) => {
    return (
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                {title}
            </h2>

            <nav>
                <ol className="flex items-center gap-2">
                    {links?.map((link, index) => (
                        <li key={index}>
                            <Link className="font-medium" to={link.to}>
                                {link.name} /
                            </Link>
                        </li>
                    ))}
                    <li className="font-medium text-primary">{link_actual}</li>
                </ol>
            </nav>
        </div>
    );
}
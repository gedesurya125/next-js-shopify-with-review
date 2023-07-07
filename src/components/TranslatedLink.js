/** @jsxImportSource theme-ui */

import { useRouter } from "next/router";
import Link from "next/link";
import { pathTranslations } from "translations/pathTranslations";

const TranslatedLink = ({ href, children, sx, ...props }) => {
  const { locale } = useRouter();
  // Get translated route for non-default locales
  const translatedPath = pathTranslations[locale]?.[href];
  // Set `as` prop to change displayed URL in browser
  const as = translatedPath ? `/${locale}${translatedPath}` : undefined;

  return (
    <Link href={href} as={as} sx={sx} {...props}>
      {children}
    </Link>
  );
};

export default TranslatedLink;

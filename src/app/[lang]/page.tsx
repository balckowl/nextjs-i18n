import { LanguageProvider } from '@/app/i18n/client';
import ClientComponent from './ _components';
import { getTranslation } from '../i18n/server';
import { Trans } from 'react-i18next/TransWithoutContext';
import { availableLanguages } from "../i18n/settings" 
import Link from 'next/link';

export default async function Home({ params }: { params: { lang: string } }) {
  const lang = params.lang;
  const { t } = await getTranslation(lang)

  return (
    <main>
      <div className="m-5">{lang}</div>
      <h1>{t("app_name")}</h1>
      <LanguageProvider initialLanguage={lang}>
        <ClientComponent />
      </LanguageProvider>
      <Trans i18nKey="languageSwitcher" t={t}>
        Switch from <strong>{lang}</strong>to:{' '}
      </Trans>
      {availableLanguages.filter((l) => lang !== l).map((l, index) => {
        return (
          <span key={l}>
            {index > 0 && (' or ')}
            <Link href={`/${l}`}>
              {l}
            </Link>
          </span>
        )
      })}
    </main>
  );
}

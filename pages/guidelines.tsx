import type { GetStaticProps } from 'next';
import { SiteLayout } from '../components/SiteLayout';
import { loadStaticTemplate } from '../lib/template-loader';

type PageProps = {
  bodyHtml: string;
};

export default function GuidelinesPage({ bodyHtml }: PageProps) {
  return <SiteLayout bodyHtml={bodyHtml} title="Accessibility Guidelines" />;
}

export const getStaticProps: GetStaticProps<PageProps> = () => ({
  props: {
    bodyHtml: loadStaticTemplate('guidelines'),
  },
});

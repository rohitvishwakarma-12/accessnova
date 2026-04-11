import type { GetStaticProps } from 'next';
import { SiteLayout } from '../components/SiteLayout';
import { loadStaticTemplate } from '../lib/template-loader';

type PageProps = {
  bodyHtml: string;
};

export default function ServicesPage({ bodyHtml }: PageProps) {
  return <SiteLayout bodyHtml={bodyHtml} title="Our Services" />;
}

export const getStaticProps: GetStaticProps<PageProps> = () => ({
  props: {
    bodyHtml: loadStaticTemplate('services'),
  },
});

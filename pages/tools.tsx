import type { GetStaticProps } from 'next';
import { SiteLayout } from '../components/SiteLayout';
import { loadStaticTemplate } from '../lib/template-loader';

type PageProps = {
  bodyHtml: string;
};

export default function ToolsPage({ bodyHtml }: PageProps) {
  return <SiteLayout bodyHtml={bodyHtml} title="Accessibility Tools" />;
}

export const getStaticProps: GetStaticProps<PageProps> = () => ({
  props: {
    bodyHtml: loadStaticTemplate('tools'),
  },
});

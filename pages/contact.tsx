import type { GetServerSideProps } from 'next';
import { SiteLayout } from '../components/SiteLayout';
import { loadContactTemplate } from '../lib/template-loader';

type ContactPageProps = {
  bodyHtml: string;
};

export default function ContactPage({ bodyHtml }: ContactPageProps) {
  return <SiteLayout bodyHtml={bodyHtml} title="Contact Us" />;
}

export const getServerSideProps: GetServerSideProps<ContactPageProps> = async ({
  query,
}) => {
  const success = typeof query.success === 'string' ? query.success : undefined;
  const error = typeof query.error === 'string' ? query.error : undefined;

  return {
    props: {
      bodyHtml: loadContactTemplate({ error, success }),
    },
  };
};

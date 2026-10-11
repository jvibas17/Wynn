import { BlogLayout } from './BlogLayout';
import { privacyPolicy } from '../i18n/articles/privacyPolicy';

export function PrivacyPolicy() {
  return <BlogLayout article={privacyPolicy} legal />;
}

import { BlogLayout } from './BlogLayout';
import { getCompsAtWynn } from '../i18n/articles/getCompsAtWynn';

export function GetCompsAtWynn() {
  return <BlogLayout article={getCompsAtWynn} />;
}

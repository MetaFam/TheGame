import { useRouter } from 'next/router';

export default function useActiveTab() {
  const { query } = useRouter();
  const activeTab = query.tab ?? 'player';
  return activeTab;
}

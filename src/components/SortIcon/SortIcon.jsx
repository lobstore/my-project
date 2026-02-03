import SORT_STATES from '../../constraints/sortstates';
import { ChevronDown, ChevronUp } from 'lucide-react';
const SortIcon = ({ field, sortConfig }) => {
  if (sortConfig.field !== field) return <div style={{opacity: 0.2}}><ChevronUp size={14} /></div>;
  if (sortConfig.state === SORT_STATES.ASC) return <ChevronUp size={14} color="#2563eb" />;
  if (sortConfig.state === SORT_STATES.DESC) return <ChevronDown size={14} color="#2563eb" />;
  return null;
};

export default SortIcon;
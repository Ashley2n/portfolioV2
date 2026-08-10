import { Search } from 'lucide-react'
import React, {Dispatch, SetStateAction} from 'react'
type ProjectsHeaderProps = {
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
};
export const ProjectsHeader = ({value, setValue} :ProjectsHeaderProps) => {

  return (
    <div className="relative w-fit min-w-[200px] max-w-sm">
      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={e => setValue(e.target.value)}
        className="w-full rounded-md border border-border-subtle bg-surface-chip py-2 pl-3 pr-10 text-sm text-foreground placeholder:text-text-faint transition-colors duration-300 focus:border-border-strong focus:outline-none"
      />
      <button
        type="button"
        className="absolute right-1 top-1 rounded border border-border-subtle p-1.5  transition-colors text-text-faint disabled:pointer-events-none disabled:opacity-50"
      >
        <Search className="h-4 w-4" />
      </button>
    </div>
  )
}

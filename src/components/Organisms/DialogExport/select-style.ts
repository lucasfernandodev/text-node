import { GroupBase, StylesConfig } from "react-select";

export const styles: StylesConfig<{ value: string; label: string; }, false, GroupBase<{ value: string; label: string; }>> = {
  container: () => ({
    width: 'auto',
    position: 'relative'
  }),
  indicatorsContainer: () => ({
    backgroundColor: 'transparent',
  }),
  indicatorSeparator: () => ({
    backgroundColor: 'var(--select-indicatorSeparator-bg)'
  }),
  control: () => ({
    backgroundColor: 'transparent',
    width: 'auto',
    display: 'flex',
  }),
  singleValue: (base) => ({
    ...base,
    color: "var(--select-color)",
    fontSize: "14px"
  }),
  valueContainer: (base) => ({
    ...base,
    color: 'var(--select-color)',
    cursor: 'pointer'
  }),
  menu: () => ({
    backgroundColor: 'var(--select-portal-bg)',
    widht: '200px',
    position: 'absolute',
    right: '0px',
    padding: "8px 6px",
    borderRadius: "3px",
    boxShadow: '-4px 4px 9px 0px rgba(0,0,0,0.25),'
  }),
  option: (base, state) => ({
    ...base,
    width: '200px',
    cursor: "pointer",
    background: state.isFocused ? 'var(--select-option-hover-bg)' : 'var(--select-portal-bg)',
    fontSize: "14px"
  })
}

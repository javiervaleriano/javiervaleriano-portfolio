export default function filterProjects(data, filterValue = "") {
  return filterValue ? (
    data.filter(e => e.tags.includes(filterValue))
  ) : data;
}
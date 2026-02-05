import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export type DataTableColumn<T> = {
  header: string;
  render: (row: T, index: number) => ReactNode;
  className?: string;
};

type EmptyState = {
  iconClass: string;
  title: string;
  description: string;
};

type DataTableProps<T> = {
  title: string;
  data: T[];
  columns: DataTableColumn<T>[];
  emptyState: EmptyState;
  createTo?: string;
  getEditTo?: (row: T) => string;
  onDelete?: (row: T) => void;
  actions?: (row: T) => ReactNode;
  getRowKey?: (row: T, index: number) => string | number | undefined;
  showIndex?: boolean;
  actionsHeader?: string;
};

const DataTable = <T,>({
  title,
  data,
  columns,
  emptyState,
  createTo,
  getEditTo,
  onDelete,
  actions,
  getRowKey,
  showIndex = true,
  actionsHeader = 'Ações',
}: DataTableProps<T>) => {
  const hasActions = Boolean(getEditTo || onDelete || actions);

  return (
    <>
      <div className="row align-items-center">
        <div className="col">
          <h1 className="display-1">{title}</h1>
        </div>
        {createTo && (
          <div className="col-auto ms-auto">
            <Link to={createTo} className="btn btn-outline-success">
              <i className="bi bi-plus-lg"></i>
            </Link>
          </div>
        )}
      </div>
      <div className="row">
        <div className="col">
          {data.length === 0 ? (
            <div className="empty-state">
              <i className={emptyState.iconClass}></i>
              <h3>{emptyState.title}</h3>
              <p>{emptyState.description}</p>
            </div>
          ) : (
            <table className="table table-modern">
              <thead>
                <tr>
                  {showIndex && <th scope="col">#</th>}
                  {columns.map((column, index) => (
                    <th key={`${column.header}-${index}`} scope="col" className={column.className}>
                      {column.header}
                    </th>
                  ))}
                  {hasActions && (
                    <th scope="col" className="actions-col">
                      {actionsHeader}
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => {
                  const rowKey = getRowKey?.(row, index) ?? index;
                  return (
                    <tr key={rowKey}>
                      {showIndex && <th scope="row">{index + 1}</th>}
                      {columns.map((column, columnIndex) => (
                        <td key={`${rowKey}-${columnIndex}`} className={column.className}>
                          {column.render(row, index)}
                        </td>
                      ))}
                      {hasActions && (
                        <td className="actions-cell">
                          <div className="actions-buttons">
                            {getEditTo && (
                              <Link to={getEditTo(row)} className="btn btn-outline-warning">
                                <i className="bi bi-pencil-square"></i>
                              </Link>
                            )}
                            {onDelete && (
                              <button
                                type="button"
                                className="btn btn-outline-danger"
                                onClick={() => onDelete(row)}
                              >
                                <i className="bi bi-trash3-fill"></i>
                              </button>
                            )}
                            {actions && actions(row)}
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default DataTable;

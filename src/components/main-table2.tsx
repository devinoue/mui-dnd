import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import React from "react";

export default function MainTable2() {
  const columns: GridColDef[] = [
    { field: "col1", headerName: "Column 1", width: 150 },
    { field: "col2", headerName: "Column 2", width: 150 },
  ];
  const rows: GridRowsProp = [
    { id: 1, col1: "Hello", col2: "World" },
    { id: 2, col1: "DataGridPro", col2: "is Awesome" },
    { id: 3, col1: "MUI", col2: "is Amazing" },
  ];
  return (
    <DataGrid
      // apiRef={apiRef}
      columns={columns}
      rows={rows}
      // treeData={typeof treeKey !== "undefined"}
      // getTreeDataPath={(row: any) => row[treeKey]}
      // groupingColDef={groupingColDef}
      // rowsPerPageOptions={[10, 20, 50]}
      pagination={true}
      disableColumnFilter
      // experimentalFeatures={{ newEditingApi: true }}
      autoHeight
      editMode="row"
      // rowModesModel={rowModesModel}
      // onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
      // onCellDoubleClick={handleCellDoubleClick}
      // onRowEditStart={handleRowEditStart}
      // onRowEditStop={handleRowEditStop}
      // processRowUpdate={processRowUpdate}
      // initialState={{
      //   pagination: {
      //     pageSize: 10,
      //   },
      // }}
      // components={{
      //   Toolbar,
      //   NoRowsOverlay,
      //   Row: DndRow, // this is it in your case
      // }}
      // componentsProps={{
      //   toolbar: {
      //     selectedCellParams,
      //     richToolbar,
      //   },
      //   cell: {
      //     onFocus: handleCellFocus,
      //   },
      //   row: {
      //     onContextMenu: handleContextMenu,
      //     style: { cursor: "context-menu" },
      //   },
      // }}
    />
  );
}

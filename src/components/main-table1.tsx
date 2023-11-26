import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CSS } from "@dnd-kit/utilities";

import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import { ReactNode, useCallback, useState } from "react";
import { useIsClient } from "@/hooks/use-is-client";
import { rows as tmpRows } from "./create-data";

interface SortableCellProps {
  id: string;
  children: ReactNode;
}

// SortableなTableCellラッパーコンポーネント
function SortableCell({ id, children }: SortableCellProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  // スタイル調整用
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <TableCell ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </TableCell>
  );
}

// カラムの設定。
type Column = {
  id: string;
  name: string;
};
// カラムの初期状態
const initialColumns: Column[] = [
  {
    name: "Dessert (100g serving)",
    id: "name",
  },
  {
    name: "id",
    id: "id",
  },
  {
    name: "Fat (g)",
    id: "fat",
  },
  {
    name: "Carbs (g)",
    id: "carbs",
  },
  {
    name: "Protein (g)",
    id: "protein",
  },
];
export default function MainTable1() {
  const isClient = useIsClient();

  // カラム配列
  const [columns, setColumns] = useState<Column[]>(initialColumns);

  // 行データの配列。setter関数はこのサンプルでは使っていません。
  // 行のセルの並びはカラムの並びに従っているので、カラムの並びを変えたらセルの並びも変わります
  const [rows, _setRows] = useState(tmpRows);

  // ドラッグ終了時の処理
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (over === null) {
      return;
    }
    if (active.id !== over.id) {
      setColumns((state) => {
        const oldIndex = state.findIndex((rows) => rows.id === active.id);
        const newIndex = state.findIndex((rows) => rows.id === over.id);
        const newState = arrayMove(state, oldIndex, newIndex);

        return newState;
      });
    }
  }, []);

  if (!isClient) return <></>;
  return (
    <div>
      {/* DndContext と SortableContext は、DnD用のプロバイダーです */}
      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext
          items={columns}
          strategy={horizontalListSortingStrategy}
        >
          {/* ここからMUIのテーブル */}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <SortableCell key={column.id} id={column.id}>
                      {column.name}
                    </SortableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {/* 行を並べていく */}
                {rows.map((row) => {
                  // ……ただしカラムの並びに従って行を並べるため、カラムIDだけ抽出する
                  const columnIds = columns.map((column) => column.id);
                  return (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      {columnIds.map((columnId, i) => (
                        <TableCell
                          component="th"
                          scope="row"
                          key={`${i}-${columnId}`}
                        >
                          {row[columnId as keyof typeof row]}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </SortableContext>
      </DndContext>
    </div>
  );
}

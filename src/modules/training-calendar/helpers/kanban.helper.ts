export class KanbanHelper {
    static removeItem<T>(params: {
        dataSource: T[];
        removedIndex: number;
    }): { removedItem: T | undefined , newDataSource: T[] } {
        if (!params || !params.dataSource?.length || params.removedIndex < 0 ) {
            return {
                removedItem: undefined,
                newDataSource: []
            };
        }
        //
        const newDataSource = structuredClone(params.dataSource);
        const removedItems = newDataSource.splice(params.removedIndex, 1);
        return {
            removedItem: removedItems[0],
            newDataSource: newDataSource
        };
    }

    static insertItem<T>(params: {
        dataSource: T[];
        newItem: T | undefined,
        toIndex: number;
    }): { newDataSource: T[] } {
        if (!params || !params.newItem ) {
            return {
                newDataSource: []
            };
        }
        if (!params.dataSource) {
            params.dataSource = [];
        }
        //
        const newDataSource = structuredClone(params.dataSource);
        newDataSource.splice(params.toIndex, 0, structuredClone(params.newItem))

        return {
            newDataSource: newDataSource
        };
    }

    static reorderItem<T>(params: {
        dataSource: T[];
        fromIndex: number,
        toIndex: number;
    }): { newDataSource: T[] }  {
        if (!params || !params.dataSource?.length) {
            return {
                newDataSource: []
            };
        }
        //
        const { removedItem, newDataSource } = this.removeItem({
            dataSource: params.dataSource,
            removedIndex: params.fromIndex
        });
        return this.insertItem({
            dataSource: newDataSource,
            newItem: removedItem,
            toIndex: params.toIndex  
        })
    }
}
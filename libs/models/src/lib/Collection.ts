import type { CollectionType } from './Types';
import type { Worksheet } from './Worksheet';

export interface Collection {
    type: CollectionType;
    worksheets: Worksheet[];
}

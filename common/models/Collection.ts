import type { Worksheet } from './Worksheet';
import type { CollectionType } from './Types';

export interface Collection {
    type: CollectionType;
    worksheets: Worksheet[]
}

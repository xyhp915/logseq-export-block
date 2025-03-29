import { Block } from './types';

// Declare logseq as a global variable with any type
declare const logseq: any;

/**
 * Retrieves a block and all its children recursively from Logseq
 * @param blockId The ID of the block to retrieve
 * @returns Promise resolving to the block with its children, or null if not found
 */
export async function getBlockWithChildren(blockId: string): Promise<Block | null> {
  try {
    // Get the block from Logseq API
    const block = await logseq.Editor.getBlock(blockId);
    if (!block) {
      return null;
    }

    // Create result object
    const result: Block = {
      content: block.content,
      children: []
    };

    // Process direct children
    if (block.children && block.children.length > 0) {
      // Process each child recursively
      for (const childRef of block.children) {
        try {
          // Extract the ID
          let childId: string | undefined;
          if (typeof childRef === 'string') {
            childId = childRef;
          } else if (Array.isArray(childRef)) {
            childId = typeof childRef[1] === 'string' ? childRef[1] : String(childRef[1]);
          } else if (typeof childRef === 'object' && childRef !== null) {
            const id = childRef.id || childRef.uuid;
            childId = typeof id === 'string' ? id : id ? String(id) : undefined;
          }

          if (childId) {
            // Get this child and all its children recursively
            const childWithDescendants = await getBlockWithChildren(childId);
            if (childWithDescendants) {
              result.children.push(childWithDescendants);
            }
          }
        } catch (childError) {
          console.error('Error processing child:', childError);
        }
      }
    }

    return result;
  } catch (error) {
    console.error('Error in getBlockWithChildren:', error);
    return null;
  }
}
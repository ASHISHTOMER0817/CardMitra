export function pointsToRemember({ group }: { group?: { first?: string, second?: string, third?: string, fourth?: string } }): string[] {
      if (!group) {
          return []; // Return empty array if group is undefined
      }
  
      const { first = '', second = '', third = '', fourth = '' } = group;
  
      // Filter out empty or falsy values from the array
      const arr: string[] = [first, second, third, fourth].filter(value => !!value);
  
      return arr;
  }
  
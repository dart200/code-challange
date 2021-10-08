/** Hello, Nick! This is Sam. Today we'll:
  * - Do super quick intros
  * - Do a technical interview until XX:40
  * - Spend the last 5 minutes however you choose.
  */

interface Node<T> {
 data: T; 
 nextNode: Node<T>;
};

interface List<T>: {
 head: Node<T>;
 tail: Node<T>;
 
 append: (T: data) => {...};
 remove: (Node<T>: data) => {...};
 find: (cmp: (T: data) => boolean): Party => {....}
};

interface Party {
 name: string;
 num: number;
};
 
class Waitlist {
 list: List<Party>[] = [];
   
 join(name: string, num: number) {
   list[num].append({name, num});
 };
                       
 leave(Node<Party>: party) {
   list[party.num].remove(party);
 };
                       
 seatParty (size: number): Party {
   let party: Party;

   for (let i = size; i > 0; i--) {
     if (list[i].head) {
       party = list[i].head;
       leave(party);
       break;
     }
   }
   
   if (!party)
     return undefined;
   
   return party;
 };
 
};
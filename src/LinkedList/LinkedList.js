import Node from "./Node";


export class LinkedList {

    constructor() {
        this.head = null;      // The first node in the list
        this.size = 0;         // Number of nodes in the list
    }

    // Add a node to the end of the list
    add(data) {
        const newNode = new Node(data);
        if (!this.head) { // if head is empty then add new node
            this.head = newNode;
        } else {
            let current = this.head; //if any node exists , make that head node current and traverse to the end 
            while (current.next) {
                current = current.next;
            }
            current.next = newNode; // then add new node to the end 
        }
        this.size++;
    }

    //delete
    delete(data) {
        if (!this.head) {
          return false; // List is empty, so return false
        }
      
        if (this.head.data === data) {
          this.head = this.head.next;
          return true; // Node was found and deleted, so return true
        }
      
        let current = this.head;
        while (current.next && current.next.data !== data) {
          current = current.next;
        }
      
        if (current.next) {
          current.next = current.next.next;
          return true; // Node was found and deleted, so return true
        } else {
          return false; // Node was not found, so return false
        }
      }
      
    find(data) {
        let current = this.head;
        while (current && current.data !== data) {
            current = current.next;
        }
        return current;
    }

    display() {
        let current = this.head;
        let listString = '';
        while (current) {
            listString += current.data + ' -> ';
            current = current.next;
        }
        return listString + 'null';
    }









}
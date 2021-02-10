use computeradaptivetest;

-- (1, "", "", "", "", "", "", ""),
-- (2, "", "", "", "", "", "", ""),
-- (3, "", "", "", "", "", "", ""),
-- (4, "", "", "", "", "", "", ""),
-- (5, "", "", "", "", "", "", ""),
-- (6, "", "", "", "", "", "", ""),



desc subject_domains;

insert into subject_domains values
(101, 'Maths'),
(102, 'Algebra'),
(103, 'Geometry'),
(104, 'Science'),
(105, 'Chemistry'),
(106, 'Physics'),
(107, 'Biology'),
(108, 'History'),
(109, 'Geography'),
(110, 'Civics'),
(111, 'Data Structures'),
(112, 'C/CPP'),
(113, 'Software Engineering'),
(114, 'Dot Net'),
(115, 'Core Java'),
(116, 'Advanced Java'),
(117, 'Advanced Web Programming'),
(118, 'MEAN Stack'),
(119, 'Operating Systems'),
(120, 'MySQL');



insert into question (question_id, question, option1, option2, option3, option4, correct_option, difficulty, domain_id) 
values
(1, "Which of the following is the disadvantage of the array?", "Stack and Queue data structures can be implemented through an array.", "Index of the first element in an array can be negative", "Wastage of memory if the elements inserted in an array are lesser than the allocated size", "Elements can be accessed sequentially.", "Wastage of memory if the elements inserted in an array are lesser than the allocated size", "EASY", 111),
(8, "Which one of the following is the size of int arr[9] assuming that int is of 4 bytes?", "9", "36", "35", "None of the above", "36", "EASY", 111),
(9, "Which one of the following is the process of inserting an element in the stack?", "Insert", "Add", "Push", "None of the above", "Push", "EASY", 111),
(10, "When the user tries to delete the element from the empty stack then the condition is said to be a ____", "Underflow", "Garbage collection", "Overflow", "None of the above", "Underflow", "EASY", 111),
(11, "If the size of the stack is 10 and we try to add the 11th element in the stack then the condition is known as___", "Underflow", "Garbage collection", "Overflow", "None of the above", "Overflow", "MED", 111),
(12, "Which one of the following is the overflow condition if a circular queue is implemented using array having size MAX?", "rear= MAX-1", "rear=MAX", "front=(rear+1) % max", "None of the above", "front=(rear+1) % max", "MED", 111),
(13, "The time complexity of enqueue operation in Queue is __", "O(1)", "O(n)", "O(logn)", "O(nlogn)", "O(1)", "MED", 111),
(14, "Which of the following that determines the need for the Circular Queue?", "Avoid wastage of memory", "Access the Queue using priority", "Follows the FIFO principle", "None of the above", "Avoid wastage of memory", "MED", 111),
(15, "How many Queues are required to implement a Stack?", "3", "2", "1", "4", "2", "MED", 111),
(16, "Which one of the following is not the application of the Queue data structure?", "Resource shared between various systems", "Data is transferred asynchronously", "Load balancing", "Balancing of symbols", "Balancing of symbols", "MED", 111),
(17, "Which data structure is the best for implementing a priority queue?", "Stack", "Linked list", "Array", "Heap", "Heap", "MED", 111),
(18, "Which of the following statement is not true regarding the priority queue?", "Processes with different priority can be easily handled", "Easy to implement", "Deletion is easier", "None of the above", "Deletion is easier", "MED", 111),
(19, "Which of the following properties does a simple graph not hold?", "Must be connected", "Must be unweighted", "Must have no loops or multiple edges", "Must have no multiple edges", "Must be connected", "MED", 111),
(20, "Which of the following statement is not true about the doubly linked list?", "We can traverse in both the directions.", "It requires extra space", "Implementation of doubly linked list is easier than the singly linked list", "It stores the addresses of the next and the previous node", "Implementation of doubly linked list is easier than the singly linked list", "MED", 111),
(21, "Which of the following satisfies the property of the Red Black tree?", "a) A tree which is a binary search tree but not strictly balanced tree.", "b) A node must be either Red or Black in color and root node must be black.", "c) A tree with maximum three children", "d) Both a and b", "d) Both a and b", "HARD", 111),
(22, "What would be the color of newly created node while inserting a new element in a Red black tree?", "a) Black, if the new node is not a root node", "b) Red, if the new node is not a root node", "c) Black, if the new node is a root node", "d) Both b and c", "d) Both b and c", "HARD", 111),
(23, "What is a time complexity for x pattern occurrence of length n?", "O (log n!)", "Ɵ (n!)", "O (n2)", "Ɵ (n + x)", "Ɵ (n + x)", "HARD", 111),
(24, "What is a time complexity for finding the longest palindromic substring in a string by using the generalized suffix tree?", "Linear Time", "Exponential Time", "Logarithmic Time", "Cubic Time", "Linear Time", "HARD", 111),
(25, "The minimum height of self balancing binary search tree with n nodes is _____", "log2(n)", "n", "2n + 1", "2n - 1", "log2(n)", "HARD", 111),
(26, "A self – balancing binary search tree can be used to implement ________", "Priority queue", "Hash table", "Heap sort", "Priority queue and Heap sort", "Priority queue", "HARD", 111),
(27, "Why to prefer red-black trees over AVL trees?", "Because red-black is more rigidly balanced", "AVL tree store balance factor in every node which costs space", "AVL tree fails at scale", "Red black is more efficient", "AVL tree store balance factor in every node which costs space", "HARD", 111),
(28, "Which of the following is true?", "B + tree allows only the rapid random access", "B + tree allows only the rapid sequential access", "B + tree allows rapid random access as well as rapid sequential access", "B + tree allows rapid random access and slower sequential access", "B + tree allows rapid random access as well as rapid sequential access", "HARD", 111),
(29, "Statement 1: When a node is split during insertion, the middle key is promoted to the parent as well as retained in right half-node.
Statement 2: When a key is deleted from the leaf, it is also deleted from the non-leaf nodes of the tree", "a) Statement 1 is true but statement 2 is false", "b) Statement 2 is true but statement 1 is false", "c) Both the statements are true", "d) Both the statements are false", "a) Statement 1 is true but statement 2 is false", "HARD", 111),
(30, "A connected planar graph having 6 vertices, 7 edges contains _____________ regions.", "15", "3", "1", "11", "3", "HARD", 111);

select * from question;

show tables;
select * from users;



select * from question where domain_id = 111;

desc subject_domains;

insert into users values('pratikghare888@gmail.com', 8149330176, 'Pratik', 'Male', false, 'Ghare', 'password', NULL,  false, 2);

insert into users values('admin', 8149330176, 'Pratik', 'Male', true, 'Ghare', 'Admin@123', NULL,  false, 1);

insert into quiz values (111111, 1, "MyDemoQuiz", 111, "admin");

insert into answers values
(1, 'Overflow', 11),
(2, 'front=(rear+1) % max', 12),
(3, 'O(1)', 13),
(4, 'Avoid wastage of memory', 14),
(5, '2', 15),
(6, 'Balancing of symbols', 16),
(7, 'Array', 17),
(8, 'None of the above', 18),
(9, 'Must have no multiple edges', 19),
(10, 'Implementation of doubly linked list is easier than the singly linked list', 20);

insert into quiz values
(6454482, 1, 'MyDemoQuiz', 111, 'admin');

insert into quiz_questions values
(6454482, 11),
(6454482, 12),
(6454482, 13),
(6454482, 14),
(6454482, 15),
(6454482, 16),
(6454482, 17),
(6454482, 18),
(6454482, 19),
(6454482, 20);


insert into result values
(1, false, 14, 20,  6454482, 'pratikghare888@gmail.com');

insert into question_ans values
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(1, 9),
(1, 10);
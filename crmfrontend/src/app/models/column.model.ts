// export class Column {
//     constructor(public name: string, public id: string, public tasks: string[]) {}
//   }

// negotiation , 1 , tasks 
// instaed of tasks , lead details card will be displayed

export class Column {
  constructor(
    public name: string, // name of the column
    public id: string,  // for drag drop column id
    public leads: {
      leadId: number,
      customer: string,
      salesperson: string,
      // pipelineStage: string
    }[]
  ){}
}

// pay very close attention to the syntax of the class definition;
//  you missed the {} in the end initially
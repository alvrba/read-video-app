
export const initialEmptyState =
{
  title: "Aprendiendo React",
  description: "Con este video se quire conseguir aprender los conceptos básicos de React",
  url: "Mqj867q3NdM",
  marks: [
    {
      title: "Marca 1",
      time: 25,
      type: "TEST",
      content: {
        question: "El estado de un componente de React se crea en su constructor",
        answer: true,
        reason: 'Durante el ciclo de vida, el estado del componente se crea en el constructor del mismo a través de this.state = ...',
        blocks: true,
        returnTime: 10,
        returned: false,
        correct: -1,
        completed: false
      }

    },

      {
        title: "Marca 2",
        time: 25,
        type: "QUESTION",
        content: {
          question: "Para cambiar el estado de React...",
          numberAnswers: 3,
          answers: ["Se cambia desde this.state...", "Hay que hacer uso de la función setState()", "El estado de React no se puede mutar"],
          correctAnswers: [false, true, false],
          reason: 'Para mutar el estado de React hay que utilizar la función setState() salvo cuando se crea en el constructor, que se utiliza la asignación this.state = ...',
          blocks: true,
          returnTime: 15,
          returned: false,
          correct: false,
          completed: false
        }

      },

      {
        title: "Marca 3",
        time: 60,
        type: "WEB",
        content: {
          url: "https://es.wikipedia.org/wiki/React",
          description: "Informaicón adicional sobre React",
          reason: 'También es posible consultar la documentación oficial',
          blocks: false,
          returnTime: 0,
          returned: true,
          correct: true,
          completed: true
        }

      },
      {
        title: "Marca 4",
        time: 80,
        type: "INFO",
        content: {
          description: "Como aclaración, los props son únicamente de lectura y no se pueden mutar en los componentes hijos",
          reason: '',
          blocks: false,
          returnTime: 0,
          returned: true,
          correct: true,
          completed: true
        }

      }

  ]
}

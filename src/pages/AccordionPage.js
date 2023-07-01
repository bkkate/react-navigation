import Accordion from "../components/Accordion";

function AccordionPage() {
  const items = [
    {
      id: "12345",
      label: "label1",
      content: "content-1",
    },
    {
      id: "2468",
      label: "label-2",
      content: "content-2",
    },
    {
      id: "skehahffk",
      label: "label-3",
      content: "content-3",
    },
  ];
  return <Accordion items={items} />;
}

export default AccordionPage;

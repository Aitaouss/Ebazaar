export function MessageToDisplayFun(
  messages: any[],
  user: any,
  inputName: string
) {
  const MessagesWithouMeAsReceiver = messages.filter(
    (msg) => msg.sender_name !== user.name
  );
  const MessagesWIithoutDuplicateName = Array.from(
    new Map(
      MessagesWithouMeAsReceiver.map((msg) => [msg.sender_name, msg])
    ).values()
  );

  const filteredMessages = MessagesWIithoutDuplicateName.filter((msg) =>
    msg.sender_name.toLowerCase().includes(inputName.toLowerCase())
  );
  return filteredMessages;
}

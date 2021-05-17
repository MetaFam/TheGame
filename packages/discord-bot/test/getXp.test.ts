import { GetXpCommand } from '../src/discord/commands/getXp';

const printReply = {
  reply: (msg: string) => console.log(msg),
};

describe('getxp command', () => {
  const message = {
    content: '',
    author: {
      bot: false,
    },
    args: {},
    reply: jest.spyOn(printReply, 'reply'),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;

  const getXp = new GetXpCommand();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not blow up', async () => {
    message.content = '!getxp';
    message.member = {
      id: '469544954184597504',
    };
    await getXp.getXp(message);
    expect(message.reply).toHaveBeenCalled();
  });
});

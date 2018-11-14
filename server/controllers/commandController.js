import models from '../models';

const Command = models.Command;
const Category = models.Category;

class CommandController {
  static async saveCommands(req, res) {
    const { commands, category } = req.body;
    if (category) {
      const savedCategory = await Category.create(category);
      const savedCommands = await Command
        .create(commands.map(command => ({ ...command, category: savedCategory._id })));
      return res.status(201).json({ commands: savedCommands });
    }
    const savedCommands = await Command.create(commands);
    return res.status(201).json({ commands: savedCommands });
  }

  static async deleteCommand(req, res) {
    await Command.findOneAndDelete({ _id: req.params.id });
    res.json({ success: true });
  }

  static async updateCommand(req, res) {
    const { id } = req.params;
    const { command } = req.body;
    const updatedCommand = await Command
      .findOneAndUpdate({ _id: id }, command);
    res.json({ command: updatedCommand });
  }
}

export default CommandController;

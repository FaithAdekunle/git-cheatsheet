class CommandController {
  static saveCommands(models) {
    const { Command, Category } = models;
    return async (req, res) => {
      const { commands, categoryId } = req.body;
      const savedCommands = await Command
        .create(commands.map(command => ({ ...command, categoryId })));
      const category = await Category.findOne({ _id: categoryId });
      await Category
        .findOneAndUpdate(
          { _id: categoryId },
          {
            commands: [
              ...category.commands,
              ...savedCommands.map(savedCommand => savedCommand._id),
            ],
          },
        );
      return res.status(201).json({ success: true, commands: savedCommands });
    };
  }

  static deleteCommand(models) {
    const { Command } = models;
    return async (req, res) => {
      await Command.findOneAndDelete({ _id: req.params.id });
      res.json({ success: true });
    };
  }

  static updateCommand(models) {
    const { Command } = models;
    return async (req, res) => {
      const { id } = req.params;
      const { command } = req.body;
      command.categoryId = undefined;
      await Command.findOneAndUpdate({ _id: id }, command);
      const updatedCommand = await Command.findOne({ _id: id });
      return res.json({ success: true, command: updatedCommand });
    };
  }

  static confirmCommand(models) {
    const { Command } = models;
    return async (req, res, next) => {
      const { id } = req.params;
      try {
        const command = await Command.findOne({ _id: id });
        if (command) return next();
        return res.status(404).json({ success: false, error: 'command not found' });
      } catch {
        return res.status(404).json({ success: false, error: 'command not found' });
      }
    };
  }

  static moveCommand(models) {
    const { Category, Command } = models;
    return async (req, res) => {
      const { id } = req.params;
      const { fromCategoryId, toCategoryId } = req.body;
      const fromCategory = await Category.findOne({ _id: fromCategoryId });
      const toCategory = await Category.findOne({ _id: toCategoryId });
      const command = await Command.findOne({ _id: id });
      if (fromCategory && toCategory) {
        if (fromCategory.commands.indexOf(id) === -1) {
          return res.status(404)
            .json({
              success: false,
              error: `command '${command.script}' does not belong in category '${fromCategory.title}'`,
            });
        }
        const fromCommands = fromCategory.commands.filter(commandId => commandId != id);
        const toCommands = [...toCategory.commands, id];
        await Category.findOneAndUpdate({ _id: fromCategoryId }, { commands: fromCommands });
        await Category.findOneAndUpdate({ _id: toCategoryId }, { commands: toCommands });
        await Command.findOneAndUpdate({ _id: id }, { categoryId: toCategoryId });
        return res.json({ success: true });
      }
      return res.status(404)
        .json({ success: false, error: 'invalid fromCategoryId or toCategoryId' });
    };
  }

  static controllers(models) {
    return {
      saveCommands: CommandController.saveCommands(models),
      deleteCommand: CommandController.deleteCommand(models),
      updateCommand: CommandController.updateCommand(models),
      moveCommand: CommandController.moveCommand(models),
      confirmCommand: CommandController.confirmCommand(models),
    };
  }
}

export default CommandController;

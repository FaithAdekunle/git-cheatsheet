class CommandController {
  static saveCommands(models) {
    const { Command, Category } = models;
    return async (req, res) => {
      const { commands, categoryId } = req.body;
      const savedCommands = await Command
        .create(commands.map(command => ({ ...command, categoryId, userId: req.userId })));
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
      const { userId } = req;
      const command = await Command.findOne({ _id: req.params.id }).populate('categoryId');
      if (userId == command.userId || userId == command.categoryId.userId) {
        await Command.findOneAndDelete({ _id: req.params.id });
        return res.json({ success: true });
      }
      return res.status(401).json({ success: false, error: 'unauthorized' });
    };
  }

  static updateCommand(models) {
    const { Command } = models;
    return async (req, res) => {
      const { id } = req.params;
      const { userId } = req;
      const { command } = req.body;
      const update = await Command.findOne({ _id: req.params.id }).populate('categoryId');
      if (userId == update.userId || userId == update.categoryId.userId) {
        await Command.findOneAndUpdate({ _id: id }, command);
        const updatedCommand = await Command.findOne({ _id: id });
        return res.json({ success: true, command: updatedCommand });
      }
      return res.status(401).json({ success: false, error: 'unauthorized' });
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

  static togglePrivacyStatus(models) {
    const { Command } = models;
    return async (req, res) => {
      const command = await Command.findOne({ _id: req.params.id });
      if (req.userId == command.userId) {
        await Command
          .findOneAndUpdate({ _id: req.params.id }, { privacyStatus: !command.privacyStatus });
        return res.json({ success: true });
      }
      return res.status(401).json({ success: false, error: 'unauthorized' });
    };
  }

  static moveCommand(models) {
    const { Category, Command } = models;
    return async (req, res) => {
      const { userId } = req;
      const { id } = req.params;
      const { fromCategoryId, toCategoryId } = req.body;
      const command = await Command.findOne({ _id: id }).populate('categoryId');
      if (userId == command._id || userId == command.categoryId.userId) {
        const fromCategory = await Category.findOne({ _id: fromCategoryId });
        const toCategory = await Category.findOne({ _id: toCategoryId });
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
      }
      return res.status(401).json({ success: false, error: 'unauthorized' });
    };
  }

  static controllers(models) {
    return {
      saveCommands: CommandController.saveCommands(models),
      deleteCommand: CommandController.deleteCommand(models),
      updateCommand: CommandController.updateCommand(models),
      moveCommand: CommandController.moveCommand(models),
      confirmCommand: CommandController.confirmCommand(models),
      togglePrivacyStatus: CommandController.togglePrivacyStatus(models),
    };
  }
}

export default CommandController;

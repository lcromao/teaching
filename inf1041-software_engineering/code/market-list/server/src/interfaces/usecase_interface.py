from abc import ABC, abstractmethod
from typing import Any, Dict


class UseCaseInterface(ABC):
    def __init__(self):
        """Initialize the use case interface."""
        pass

    @abstractmethod
    def execute(self, params: Dict[str, Any]):
        """Execute the use case with the given parameters.

        Args:
            params (Dict[str, Any]): A dictionary of parameters for the use case.

        Returns:
            List[Dict[str, Any]]: A list of dictionaries representing the result.
        """
        pass

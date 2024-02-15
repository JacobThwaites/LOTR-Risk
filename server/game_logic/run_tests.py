import unittest

test_loader = unittest.TestLoader()
test_suite = test_loader.discover("test", pattern="test*.py")

test_runner = unittest.TextTestRunner(verbosity=2)
test_runner.run(test_suite)